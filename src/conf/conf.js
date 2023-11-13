
//***** for better import syntax and no leackage  */
const conf = {
  appWrite_url: String(import.meta.env.VITE_APPWRIT_URL),
  appWrite_ProjectId: String(import.meta.env.VITE_APPWRIT_PROJECT_ID),
  appWrite_DatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appWrite_CollactionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appWrite_BucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;
