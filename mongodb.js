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
show collections

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

// 
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

