'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const logs = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        log(stateCopy, logs);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        log(stateCopy, logs);
        break;

      case 'clear':
        clearProperties(stateCopy);
        log(stateCopy, logs);
        break;
    }
  }

  return logs;
}

function addProperties(stateCopy, dataToAdd) {
  Object.assign(stateCopy, dataToAdd);
}

function removeProperties(stateCopy, dataToRemove) {
  for (const key of dataToRemove) {
    delete stateCopy[key];
  }
}

function clearProperties(stateCopy) {
  for (const key in stateCopy) {
    delete stateCopy[key];
  }
}

function log(stateToLog, logs) {
  logs.push({ ...stateToLog });
}

module.exports = transformStateWithClones;
