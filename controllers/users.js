const UserModel = require('../models/UserModel');
const {
  successResponse,
  errorResponse,
} = require('../services/handleResponse');
const users = {
  /**
   * 取得所有使用者
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.find
   * @param {Object} req
   * @param {Object} res
   */
  async getUsers(req, res) {
    const allUser = await UserModel.find();
    successResponse(res, allUser);
  },
  /**
   * 新增單筆使用者
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.create
   * @param {Object} req
   * @param {Object} res
   */
  async createUser(req, res) {
    try {
      const { body } = req;
      body.name = body.name?.trim(); // 頭尾去空白
      if (!body.name) throw new Error('[新增失敗] name 未填寫');
      const newUser = await UserModel.create({
        name: body.name,
        email: body.email,
        photo: body.photo,
      });
      successResponse(res, newUser);
    } catch (err) {
      errorResponse(res, err);
    }
  },
  /**
   * 刪除所有使用者
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany
   * @param {Object} req
   * @param {Object} res
   */
  async deleteUsers(req, res) {
    await UserModel.deleteMany({});
    successResponse(res, []);
  },
  /**
   * 刪除單筆使用者
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndDelete
   * @param {Object} req
   * @param {Object} res
   */
  async deleteUserById(req, res) {
    try {
      const id = req.params.id;
      const deleteUserById = await UserModel.findByIdAndDelete(id);
      if (!deleteUserById) throw new Error('[刪除失敗] 沒有此 id');
      successResponse(res, deleteUserById);
    } catch (err) {
      errorResponse(res, err);
    }
  },
  /**
   * 修改單筆使用者
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate
   * @param {Object} req
   * @param {Object} res
   */
  async updateUserById(req, res) {
    try {
      const { body } = req;
      const id = req.params.id;
      if (body.email) throw new Error('[修改失敗] 不可修改 user');
      if (!body.name) throw new Error('[修改失敗] name 未填寫');
      body.name = body.name?.trim(); // 頭尾去空白
      const updateUserById = await UserModel.findByIdAndUpdate(
        id,
        {
          name: body.name,
          // email: body.email,
          photo: body.photo,
        },
        {
          // 加這行才會返回更新後的資料，否則為更新前的資料。
          returnDocument: 'after',
          // update 相關語法預設 runValidators: false，需手動設寪 true。Doc:https://mongoosejs.com/docs/validation.html#update-validators
          runValidators: true,
        }
      );
      if (!updateUserById) throw new Error('[修改失敗] 沒有此 id');
      successResponse(res, updateUserById);
    } catch (err) {
      errorResponse(res, err);
    }
  },
};
module.exports = users;
