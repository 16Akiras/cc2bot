const clashApi = require('clash-of-clans-api');
const logger = require('../logger.js');

try {
  var auth = require("../auth.json");
} catch (e) {
  logger.error("Please create an auth.json file like auth.json.example " + e);
  process.exit();
}

let client = clashApi({
  token: auth.clashApiToken || 'test'
});

// Returns a future for the current war for the specific clan.
exports.getCurrentWar = function(clanTag) {
  if (!clanTag.startsWith('#')) {
    clanTag = `#${clanTag}`;
  }
  logger.debug(`Fetching current war for ${clanTag}`);

  return client.clanCurrentWarByTag(clanTag).
      then(currentWar => {
        logger.debug(`Current war for ${clanTag}: ${JSON.stringify(currentWar)}`);
        return currentWar;
        /* Test code */
        /*
        var fs = require('fs');
        var obj = JSON.parse(fs.readFileSync('./sample_data/clash_of_clans_api_ended_war.json', 'utf8'));
        return obj;
        */
      });
};