const { Given, Then } = require('@cucumber/cucumber');
const supertest = require('supertest');
const assert = require('assert');

const request = supertest('https://testapi.io/api/RMSTest');

let response;
let responseTime;

Given('I send a GET request to {string}', async function (endpoint) {
  const start = Date.now(); 
  response = await request.get(endpoint);
  responseTime = Date.now() - start; // Calculate response time to use later
});

Then('the status code should be {int}', function (statusCode) {
  assert.strictEqual(response.status, statusCode);
});

Then('the response time should be below {int} milliseconds', function (time) {
  assert(responseTime < time, `Expected response time to be below ${time}ms, but got ${responseTime}ms`);
});

Then('all schedule items should have non-empty "id"', function () {
  response.body.schedule.elements.forEach(item => {
    assert(item.episode.id !== '', 'ID should not be empty');
  });
});

Then('all schedule items should have "type" as "episode"', function () {
  response.body.schedule.elements.forEach(item => {
    assert.strictEqual(item.episode.type, 'episode', `Expected type to be 'episode', but got ${item.type}`);
  });
});

Then('the "title" field in every schedule item should not be empty', function () {
  response.body.schedule.elements.forEach(item => {
    assert(item.episode.title !== '', 'Title should not be null or empty');
  });
});

Then('only one episode should have the "live" field set to true', function () {
    const liveEpisodes = response.body.schedule.elements.filter(item => item.episode && item.episode.live === true);
    assert.strictEqual(liveEpisodes.length, 1, 'There should be exactly one live episode');
  });
  

Then('the "transmission_start" date should be before the "transmission_end" date', function () {
    response.body.schedule.elements.forEach(item => {
      const transmissionStart = new Date(item.transmission_start);
      const transmissionEnd = new Date(item.transmission_end);
      assert(transmissionStart < transmissionEnd, `"transmission_start" (${transmissionStart}) should be before "transmission_end" (${transmissionEnd})`);
    });
  });

Then('the "Date" header should exist', function () {
    assert(response.headers['date'], 'The "Date" header should exist in the response');
  });
  
Then('the error object should have properties "details" and "http_response_code"', function () {
    const error = response.body.error;  
    assert(error.hasOwnProperty('details'), 'The error object should have a "details" property');
    assert(error.hasOwnProperty('http_response_code'), 'The error object should have a "http_response_code" property');
  });
  