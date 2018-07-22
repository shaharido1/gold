import { ConfigHandler, EnvironementMode } from '../configHandler';
import { configFileLocation } from './configPathTest';
import { expect } from 'chai';
import 'mocha';


describe('Testing config handler', () => {
  enum settings {
    object = 'object',
    Environment = 'config_env',
    CustomPath = './validateMockData.custom.json'
  }

  const testResults = {
    dev: { 'a': { '1': 'a1', '2': 'a2' }, 'b': 'B' },
    test: { 'a': 'A', 'b': 'B', 'c': 'C' },
    prod: { 'a': { '1': 'a.1', '2': 'a.2', '3': { '1': 'a.3.1', '2': 'a.3.2' } }, 'b': 'B' },
    custom: { 'o': 'O', 'h': 'H', 'a': 'A', 'd': 'D' }
  };

  it('config handler - only file', (done) => {
    process.env[settings.Environment] = undefined;
    const configHandler = new ConfigHandler(configFileLocation);
    expect(configHandler.finalConfig).to.be.a(settings.object);
    expect(configHandler.finalConfig).to.deep.equal(testResults.dev);
    done();
  });

  it('Test the object in test environment', (done) => {
    process.env[settings.Environment] = EnvironementMode.test;
    const configHandler = new ConfigHandler(configFileLocation);
    expect(configHandler.environmentMode).to.equal(EnvironementMode.test);
    expect(configHandler.finalConfig).to.be.a(settings.object);
    expect(configHandler.finalConfig).to.deep.equal(testResults.test);
    done();
  });

  it('Test the object in development environment', (done => {
    process.env[settings.Environment] = EnvironementMode.dev;
    const configHandler = new ConfigHandler(configFileLocation);
    expect(configHandler.environmentMode).to.equal(EnvironementMode.dev);
    expect(configHandler.finalConfig).to.be.a(settings.object);
    expect(configHandler.finalConfig).to.deep.equal(testResults.dev);
    done();

  }));

  it('Test the object in production environment', (done => {
    process.env[settings.Environment] = EnvironementMode.prod;
    const configHandler = new ConfigHandler(configFileLocation);
    expect(configHandler.environmentMode).to.equal(EnvironementMode.prod);
    expect(configHandler.finalConfig).to.be.a(settings.object);
    expect(configHandler.finalConfig).to.deep.equal(testResults.prod);
    done();
  }));

  it('Test the object in custom ', (done => {
    process.env[settings.Environment] = EnvironementMode.custom;
    process.env['configFileLocation'] = settings.CustomPath;
    const configHandler = new ConfigHandler(configFileLocation);
    expect(configHandler.environmentMode).to.equal(EnvironementMode.custom);
    expect(configHandler.finalConfig).to.be.a(settings.object);
    expect(configHandler.finalConfig).to.deep.equal(testResults.custom);
    done();
  }));
});
