/**
 * @interface
 * Class using it has been put into gitIgnore to prevent credentials misuse.
 * If not found, create class DataBaseCredentials in the file ./credentials.js
 */
export interface IDataBaseCredentials {
    /**
     * name of the database
     */
    db: string;
    /**
     * user who can access the database
     */
    username: string;
    /**
     * password for the db user
     */
    password: string;
    /**
     * All the permissions assigned to the user
     */
    permissions?: Array<dbPermission>;

    /**
     * generates the url for the db using the given info
     */
    generateUrl():  string
         
}

export enum dbPermission {
    read = 'read',
    write = 'write'
}