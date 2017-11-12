/**
 * This class/object was created to decipher the csv inititally but since then no use. Kept it for legacy purposes. You will notice the names are converted to much more computer friendly. 
 * @class
 * @constructor
 * @param {object}  obj       This is the incoming information. 
 */
function Organism(obj) { //(dataProvider, dataset, scientificName, rank, author, specificEpithet, kingdom, phylum, clas, order, family, genus, species, iabinId, accepted, taxonomyTreeUrl, taxonPageUrl) {
  this.dataProvider= obj["Data provider"];  //table.getObject()[1]["Data provider"]
  this.dataset= obj.Dataset;
  this.scientificName= obj["Scientific name"];
  this.rank= obj.Rank;
  this.author= obj.Author;
  this.specificEpithet= obj["Specific epithet"];
  this.kingdom= obj.Kingdom;
  this.phylum= obj.Phylum
  this.clas= obj.Class;
  this.order= obj.Order;
  this.family= obj.Family;
  this.genus= obj.Genus;
  this.species= obj.Species;
  this.iabinId= obj["IABIN ID"];
  this.accepted= obj.Accepted;
  this.taxonomyTreeUrl= obj["Taxonomy tree url"];
  this.taxonPageUrl= obj["Taxon page url"];
}
