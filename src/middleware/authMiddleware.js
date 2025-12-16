export const requireAuth= (req, res, next) =>{
    if(!req.session.userId || !req.session){
        return res.status(401).json({message : "Unauthorised. Please log in"});
    }
    next();
}