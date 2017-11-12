/**
 * This class/object was created to decipher the csv inititally but since then no use. Kept it for legacy purposes. You will notice the names are converted to much more computer friendly. 
 * @class
 * @constructor
 * @param {object}  obj       This is the incoming information. 
 */
function Product(obj) { //(dataProvider, dataset, scientificName, rank, author, specificEpithet, kingdom, phylum, clas, order, family, genus, species, iabinId, accepted, taxonomyTreeUrl, taxonPageUrl) {
  this.id= obj["id"];  //table.getObject()[1]["Data provider"]
  this.keywords = concat(splitTokens(obj["tags"].toLowerCase(), ", -/"),concat(splitTokens(obj.handle.toLowerCase(),"- ,"),splitTokens(obj["product_type"].toLowerCase(), "- ")));
}
