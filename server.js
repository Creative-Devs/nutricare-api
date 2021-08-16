const express = require('express');
const cors = require('cors');

// require('dotenv').config();

const server = express();
server.use(cors());
server.use(express.json())
const mongoose=require('mongoose')

const PORT = process.env.PORT || 8080
mongoose.connect('mongodb://localhost:27017/recipe',{ useNewUrlParser: true, useUnifiedTopology: true });

const recipeSchema = new  mongoose.Schema({     name:String,     img:String,     col:Number,  source:String});
var recipeModel = mongoose.model("recipeColl",  recipeSchema);

server.get('/', (req, res) => {
    res.send('Home route');
})


server.get('/getRecipe',getRecipeHandler)
server.post('/favrecipe',favHandler)
server.get('/getFavorit',getFavorit)
server.delete('/deleteFav/:id',deleteFav)
server.put('/updateData/:id',updataHandler)

function getRecipeHandler(req,res){
    // const Recipe=req.query.;
    const url=(`https://api.edamam.com/search?app_id=deaf362d&app_key=da028fb12902501b23d2358ae3006d81&q=pizza`)
    axios.get(url).then(result=>{
      const RecipeArray =result.data.map(item=>{
            return new Recipe(item)
        })
        res.send(RecipeArray)
    })
}

function favHandler(req,res){
const{name,img,cal,source}=req.body;
const newRecipe= new recipeModel({
    name:name,
    img:img,
    cal:cal,
    source:source
})
newRecipe.save()
}

function getFavorit(req,res){
   recipeModel.find({},(error,favData)=>{
       res.send(favData)
})
}

function deleteFav(req,res){
    const id=req.params.id;
   const deletedArr=recipeModel.remove({_id:id},(error,deletedData)=>{
    deletedArr.save()
}) 
deletedArr.recipeModel.find({},(error,data)=>{
     res.send(data)
    })
}

function updataHandler(req,res){
    const {name,img,cal,source}=req.body
    const id=req.params.id;
     recipeModel.findOne({_id:id},(error,obj)=>{
     obj.save().then(()=>{
      obj.find({},(error,newObj)=>{
          res.send(newObj)
      })
     })
  })
}

class Recipe{
    constructor(item){
        this.name=item.name;
        this.img=item.img;
        this.cal=item.cal;
        this.img=item.img;
        this.source=item.source;
    }
}


server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
