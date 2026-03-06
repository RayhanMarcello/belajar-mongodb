// buat collection

// Cara 1 , saat insert data.

db.mahasiswa.insertOne({
  nama: "Budi",
  umur: 21,
  jurusan: "Informatika"
})

// cara 2, manual
db.createCollection("dosen")

// lihat collection
// show collections

// --------------------------------------------------

// insert data
db.mahasiswa.insertOne({
  nama: "Alya",
  umur: 20,
  jurusan: "Kedokteran"
})

// insert banyak data
db.mahasiswa.insertMany([
  {
    nama: "Citra",
    umur: 22,
    jurusan: "Farmasi"
  },
  {
    nama: "Dina",
    umur: 19,
    jurusan: "Informatika"
  }
])

// --------------------------------------------------
// melihat data

db.mahasiswa.find()

// cari data tertentu (find() => mencari seluruh document dari colection)

db.mahasiswa.find({
  jurusan: "Informatika"
})

// operator querry

// Comparison
// $eq: Values are equal
// $ne: Values are not equal
// $gt: Value is greater than another value
// $gte: Value is greater than or equal to another value
// $lt: Value is less than another value
// $lte: Value is less than or equal to another value
// $in: Value is matched within an array

// Logical
// $and: Returns documents where both queries match
// $or: Returns documents where either query matches
// $nor: Returns documents where both queries fail to match
// $not: Returns documents where the query does not match

// contohdb
db.mahasiswa.insertMany([
    {
        nama: "Alya",
    umur: 20,
    jurusan: "Informatika",
    ipk: 3.8,
    hobi: ["Membaca", "Coding"]
    },
    {
    nama: "Budi",
    umur: 22,
    jurusan: "Sistem Informasi",
    ipk: 3.4,
    hobi: ["Gaming"]
},
{
    nama: "Citra",
    umur: 19,
    jurusan: "Informatika",
    ipk: 3.9,
    hobi: ["Design"]
}
])

// or querry
db.mahasiswa.find({
    $or : [
        {hobi : "Coding"},
        {umur :20}
    ]
})  

db.mahasiswa.find({
    umur : {
        $eq : 22
    }
})

// in querry
db.mahasiswa.find({
    jurusan : {
        $in : ["Informatika", "Sistem Informasi"]
    },
    umur : {
        $gte : 22
    }
})

// and querry
db.mahasiswa.find({
    $and : [
        {
            umur : {
                $gt : 20
            }
        }, 
        {
            ipk : {
                $gt : 3
            }
        }
    ]
})

// not 

db.mahasiswa.find({
    $and : [
        {
            ipk : {$gt : 3}
        },
        {
            jurusan : {$eq : "Sistem Informasi"}
        }
    ],
    umur : {
        $not : {$eq : 20}
    }
})

// elemet querry selector

db.mahasiswa.find({
    umur : {
        $type : ["int", "long"]
    }
})

// evaluation query operator

// $expr : menggunakan aggregation
// $jsonSchema : validasi dokument sesuai json skema
// $mod : melakukan operasi modulo
// $regex : mengambil dokumn sesuai dengan regular expresion(like)
// $text : melakukan pencarian menggunakan text
// $where : mengambil document dengan javascript func

db.customers.insertOne({
        _id : "joko",
        name : "joko"
    }
)

db.customers.find({
    $expr : {
        $eq : ["$_id", "$name"]
    }
})

db.customers.find({
    $jsonSchema : {
        required : ["name"],
        properties : {
            name : {
                type : "string"
            }
        }
    }
})

// select * from products where price % 5 = 0

db.product.insertMany([
    {
        name : "cireng",
        price : 20000,
        qty : 5
    },
    {
        name : "indomie",
        price : 3500,
        qty : 5
    }
])

db.product.find({
    price : {
        $mod : [5,0]
    }
}) 

// array querry operator
db.product.insertMany([
    {
        name : "logitech",
        price : new NumberLong("175000"),
        category : "laptop",
        tags : ["logitech", "mouse", "accesories"]
    },
    {
        name : "asus zenphone",
        price : new NumberLong("175000"),
        category : "laptop",
        tags : ["asus", "phone", "hp"]
    }
])

// select * from product where tags = "logitech" and tags = "mouse"
db.product.find({
    tags : {
        $all : ["logitech", "mouse"]
    }
})

// projection operator

// parameter kedua setelah querry
// db.<collection>.find(querry,projection)

// select _id,name,category from product

db.product.find({
    category : {
        $exists : true
    }
},{
    name : 1,
    category : 1
})

// select _id, name, category,price from product
db.product.find({},{
    tags : 0
})

// projection operator (khususnya array)

db.product.find({}, {
    name : 1,
    tags : {
        $elemMatch : {
            $in : ["logitech", "mouse","hp"]
        }
    }
})

// projection operator $(mengambil 1 data saja)
db.product.find({
    tags : {
        $exists : true
    }
},{
    name : 1, 
    "tags.$" : 1 
})

// projection operator $(mengambil 2 data teratas)

db.product.find({
    tags : {
        $exists : true
    }
},{
    name : 1, 
    tags : {
        $slice : 2
    } 
})

// query modifier (modifikasi hasil querry)

// count () : mengambil jumblah data hasil querry
// limit(size) : membatasi jumlah data yang didapat dari query
// skip(size) : menghiraukan data perhama hasil query
// sort(query) : mengurutkan data hasil query-> 1 ascending , -1 descending

// select count(*) from product
db.product.find({}).count()

// select * from product limit 4
db.product.find({}).limit(4)

// select * from product offset 2
db.product.find({}).skip(2).limit(4)

// select * from product order by category asc, name desc
db.product.find({}).sort({
    category : 1,
    name : -1
})


// -----------------------------------------------------
// update document

// updateOne() : mengubah satu document
// updateMany() : mengubah banyak document sekaligus
// replaceOne() : mengubah total suatu document dg document baru

// db.customers.update(
//     {},  -> filter
//     {},  -> update
//     {}   -> options
// )

// menggunakan operator $set


// update price set price = 10000, category = "food" where name = "cireng"
db.product.updateOne({
    name : {
        $eq : "cireng"
    }
},{
    $set : {
        price : 10000
    }
})

db.product.updateOne({
    name : {
        $eq : "cireng"
    }
},{
    $set : {
        price : 10000,
        category : "food"
    }
})

// update product set tags = ["food"] where category = "food" and tags is null
db.product.updateMany({
    $and : [
        {
            category : {
                $eq : "food"
            }
        },
        {
            tags : {
                $exists : false
            }
        }
    ]
},{
    $set : {
        tags : ["food"]
    }
})

// replace

db.product.replaceOne({
    $and : [
        {
            name : {$eq : "indomie"}
        },{
            qty : 5
        }
    ]
}, {
        name : "indomie kari ayam",
        qty : 100,
        price : 20000
})

// field update operator

// inc : menaikan nilai 

db.product.updateMany({}, {
    $inc : {
        qty : 10
    }
})

// rename : mengubah nama field suatu dokments

db.product.updateOne({},{
    $rename : {
        name : "name-product"
    }
})

// currentDate : mengubah waktu saat ini diupdate

db.product.updateMany({}, {
    $currentDate : {
        lastModifiedDate : {
            $type : "date"
        }
    }
})


// array update operator

//  $ : mengupdate array pertama sesuai kondisi querry
//  $[] : mengupdate semua arry
//  $[<identiver>] : mengupdate semua aray yg sesuai kondisi arryFilter
// <index> : mengupdate array sesuai dengan index

db.product.updateMany({},{
    $set : {
        ratings : [90,80,70]
    }
})


// update array dg operator $
db.product.updateMany({
    ratings : {$eq : 70}
},{
    $set : {
        "ratings.$" : 60
    }
})

// update all element of array

db.product.updateMany({
    ratings : 90
},{
    $set : {
        "ratings.$[]" : 100
    }
})

// update berasarkan identifier

db.product.updateMany({},{
    $set : {
        "ratings.$[elements]" : 100
    }
},{
        arrayFilters : [
            {
                elements : {
                    $gte : 80
                }
            }
        ]
    }
)

// update array index <index>

db.product.updateMany({},{
    $set : {
        "ratings.0" :0
    }
})

// ------------------------------------------------------------------------------------------
// delete document function
// db.<collections>.deleteOne/deleteMany(querry)

db.customers.insertOne({
    name : "spamer"
})

db.customers.deleteOne({
    name : "spammer"
})

// ------------------------------------------------------------------------------------------
// bulk write operation
// melakukan operasi write (crud) sekali banyak sekaligus

// db.collections.bulkWrite()

db.customers.bulkWrite([
    {
        insertOne : {
            document : {
                _id : "rayhan",
                name : "rayhan marcello"
            }
        }
    },
    {
        updateMany : {
            filter : {
                _id : {
                    $in : ["rayhan", "marcello"]
                }
            },
            update : {
                $set : {
                    name : "rayhan marcello ananda"
                }
            }
        }
    }
])
