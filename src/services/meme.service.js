// Meme Service

const Meme = require("../models/meme.model");

/**
* @description    Get memes
* @todo           Implement pagination
* @returns        An array of memes, based on pagination
*/
async function getMemes() {
  return (await Meme.find().lean());
}

async function getMeme(id) {
  return (await Meme.findById(id));
}

/**
* @description    Get trending memes
* @returns        A maximum of 15
*/
async function getPopularMemes() {
  return (await Meme.find().sort({ downloads: "1" }).limit(15).lean());
}

/**
* @description    Get trending memes
* @returns        A maximum of 15
*/
async function getTrendingMemes() {
  return (await Meme.find().sort({ likes: "1" }).limit(15).lean());
}

/**
* @description    Search for memes based on title and categories
*/
async function searchMeme(searchValue) {
  const testReg = new RegExp(searchValue);
  const meme = await Meme.find({title: testReg });
  return meme;
}

/**
* @description    Like a meme.
                  Simple update the number of likes of a meme plus one
*/
async function likeMeme(memeId) {
  const meme = await Meme.findById(memeId);
  meme.likes += 1;
  await meme.save();
  return meme.likes;
}

/**
* @description    Download meme.
                  Simple update the number of downloads of a meme
*/
async function downloadMeme(memeId) {
  const meme = await Meme.findById(memeId);
  meme.downloads += 1;
  await meme.save();
  return meme;
}

/**
* @description    Download meme.
                  Simple update the number of downloads of a meme
*/
async function downloadMeme(memeId) {
  const meme = await Meme.findById(memeId);
  meme.downloads += 1;
  await meme.save();
  return meme;
}
/**
 * @description    Add a new meme
 * @param {String} title - The title of the meme
 * @param {String} userId - The ID of the user posting the meme
 * @param {String} imagelink - The link to the meme image
 * @param {Array} categories - The categories of the meme (optional)
 * @returns        The saved meme document
 */
async function addNewMeme(title, userId, imagelink, categories = []) {
   const categories1 = ["farcaster"];
   console.log(title);
  // Create a new Meme instance
  const newMeme = new Meme({
    title: title,
    userId: userId,
    imagelink: imagelink,
    categories: categories1 // Assuming categories is an optional parameter, defaults to an empty array
  });

  // Save the new meme to the database and return the saved document
  try {
    const savedMeme = await newMeme.save();
    return savedMeme;
  } catch (error) {
    // Handle potential errors, such as validation errors or database connectivity issues
    throw error; // Rethrow the error to be handled by the caller
  }
}

module.exports = {
  getMemes,
  getTrendingMemes,
  getPopularMemes,
  downloadMeme,
  searchMeme,
  likeMeme,
  addNewMeme, // Add this line to export your new function
  getMeme
};