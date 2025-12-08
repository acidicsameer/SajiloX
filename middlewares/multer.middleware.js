import multer from "multer";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // cb(error huda k garne ,success vayepar kun folder ma halne )
  }, 
  filename:function(req,file,cb)
  {
    cb(null,Date.now()+"-"+file.originalname)
  },
});
 const upload = multer({ storage});

export { upload };