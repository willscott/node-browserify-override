module.exports = function(body, file, rule, bundle) {
  return bundle.readFile(rule['with']);
};