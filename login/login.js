export class loginController {

    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    /**
     * @returns {boolean} false when usernname or password are not matched
     */
    loginCheck() {
        if(!this.req.body || !this.req.body.username || !this.req.body.password) {
            return false;
        }
        /**
         * todo implement login
         */ 
        return true;
    };
}