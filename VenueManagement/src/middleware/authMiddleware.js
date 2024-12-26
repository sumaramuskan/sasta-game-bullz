const jwt = require('jsonwebtoken');
const axios = require('axios');


exports.authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const userId = decoded.id || decoded.userId; // get the user id of the user login 

    // console.log(req.user)
    // Validate user through User_Auth service via API Gateway
    const userResponse = await axios.get(`http://localhost:8000/auth/api/admin/users/` , {
      params:{id:userId},
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    
    if (!userResponse.data) {

      return res.status(403).json({ message: 'Invalid user.' });
    }

    next();
  } catch (error) {
    console.log(error)
    // console.log(userResponse)
    res.status(401).json({ message: 'Invalid token.' });
  }
};



// http://localhost:8000/auth/api/admin/users/676a7a0ce57084ee4b573701




exports.bookingAuth= async (req,res)=>{
  next()
}