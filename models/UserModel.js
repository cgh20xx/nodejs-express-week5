const mongoose = require('mongoose');
// mongoose schema 筆記：https://hackmd.io/@TFOivyvXT-qpG6SieUTfgw/ry2Lp9iV9

// 建立 user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入您的名字'],
    },
    email: {
      type: String,
      required: [true, '請輸入您的 Email'],
      unique: true,
      lowercase: true,
      select: false,
    },
    photo: {
      type: String,
      default: '',
    },
    // 若不使用內建 timestamps: true，也可自定 createAt 規則。
    // createAt: {
    //   type: Date,
    //   default: Date.now,
    //   select: false, // false 表不顯示此欄位。Model.find() 查不出來
    // },
  },
  {
    versionKey: false, // 預設都會在 document 中加上 __v: 0，若不需要，可以設定 false
    // collection: 'users', // 亦可直接寫死 collection 名字，不受預設小寫及結尾s影響。
    // timestamps: true, // mongoose 會自動新增 createdAt 和 updatedAt 欄位。
  }
);
// console.log('userSchema:', userSchema);

// 建立 user model
const UserModel = mongoose.model('User', userSchema);
/* 
  注意：
  mongoose 會將 'User' 轉換為 mongodb collection 的 'users'。
  所有字母強制小寫。
  結尾強制加 s ，若結尾已有 s 則不會加。
*/
module.exports = UserModel;
