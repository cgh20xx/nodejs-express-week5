const mongoose = require('mongoose');
// mongoose schema 筆記：https://hackmd.io/@TFOivyvXT-qpG6SieUTfgw/ry2Lp9iV9

// 建立 post schema
const postSchema = new mongoose.Schema(
  {
    user: {
      // mongoose.Schema.Types.ObjectId === mongoose.Schema.ObjectId
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // 對應到註冊 model 的名稱: mongoose.model('User', userSchema) 需完全一樣。
      required: [true, '貼文 ID 未填寫'],
    },
    content: {
      type: String,
      required: [true, 'Content 未填寫'],
    },
    image: {
      type: String,
      default: '',
    },
    likes: {
      type: Number,
      default: 0,
    },
    // tags: [
    //   {
    //     type: String,
    //     required: [true, '貼文標籤 tags 未填寫'],
    //   },
    // ],
    // type: {
    //   type: String,
    //   enum: ['group', 'person'],
    //   required: [true, '貼文類型 type 未填寫'],
    // },
    // 若不使用內建 timestamps: true，也可自定 createAt 規則。
    // createAt: {
    //   type: Date,
    //   default: Date.now,
    //   select: false, // false 表不顯示此欄位。Model.find() 查不出來
    // },
    // comments: {
    //   type: Number,
    //   default: 0,
    // },
  },
  {
    versionKey: false, // 預設都會在 document 中加上 __v: 0，若不需要，可以設定 false
    // collection: 'posts', // 亦可直接寫死 collection 名字，不受預設小寫及結尾s影響。
    timestamps: true, // mongoose 會自動新增 createdAt 和 updatedAt 欄位。
  }
);
// console.log('postSchema:', postSchema);

// 建立 post model
const PostModel = mongoose.model('Post', postSchema);
/* 
  注意：
  mongoose 會將 'Post' 轉換為 mongodb collection 的 'posts'。
  所有字母強制小寫。
  結尾強制加 s ，若結尾已有 s 則不會加。
*/
module.exports = PostModel;
