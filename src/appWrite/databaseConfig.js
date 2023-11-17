/* eslint-disable no-useless-catch */
import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class DbService {
    client = new Client();
    databases;
    bucket;


    constructor() {
        this.client
            .setEndpoint(conf.appWrite_url)
            .setProject(conf.appWrite_ProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, userId, content, slug, featuredImage, status }) {
        try {
            //*******databases.createDocument('[DATABASE_ID]', '[COLLECTION_ID]', '[DOCUMENT_ID]', {}); */
            return await this.databases.createDocument(
                conf.appWrite_DatabaseId,
                conf.appWrite_CollactionId,
                slug,
                {
                    title, content, featuredImage, status, userId
                }
            )
        } catch (error) {
            console.log("Appwrite service  ::  createPost ::  error ", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appWrite_DatabaseId,
                conf.appWrite_CollactionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }

            )
        } catch (error) {
            console.log("Appwrite service  ::  updatePost ::  error ", error);
        }

    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWrite_DatabaseId,
                conf.appWrite_CollactionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service  ::  deletePost ::  error ", error)
            return false;
        }
    }

    async getAllPost(queries) {
        try {
            return await this.databases.listDocuments(
                conf.appWrite_DatabaseId,
                conf.appWrite_CollactionId,
                queries,
                [
                    Query.equal("status", "active")
                ]
            )

        } catch (error) {
            console.log("Appwrite service  ::  getAllPost ::  error ", error);
            return false

        }
    }

    async getPost(slug) {
        try {
            return await this.databases.listDocument(
                conf.appWrite_DatabaseId,
                conf.appWrite_CollactionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service  ::  getPost ::  error ", error);
            return false;
        }
    }

    //********* upload files */

    async uploadFile(file) {
        try {
            await this.bucket.createFile(
                conf.appWrite_BucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service  ::  uploadfile ::  error ", error);
            return false;
        }
    }

    //********** createFile method ko call karne ke baad hume fileId mil jayegi aur file delete hone ke baad hum status true kar denge */
    async deleteFile(fileId) {
        try {
            await this.Storage.deleteFile(
                conf.appWrite_BucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service  ::  deletefile ::  error ", error);
            return false;
        }
    }

    //****** here no need to call async-await because its already very fast  */
    async getFilePreview(fileId) {
        try {
            return await this.bucket.getFilePreview(
                conf.appWrite_BucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service  ::  uploadfile ::  error ", error);
            return false;
        }
    }
}

const appwriteDbService = new DbService
export default appwriteDbService