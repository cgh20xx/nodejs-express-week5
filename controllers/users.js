const UserModel = require('../models/UserModel');
const successResponse = require('../services/successResponse');
const AppError = require('../services/appError');
const users = {
  /**
   * 取得所有使用者
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.find
   * @param {Object} req
   * @param {Object} res
   */
  async getUsers(req, res, next) {
    const allUser = await UserModel.find();
    successResponse(res, allUser);
  },
  /**
   * 新增單筆使用者
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.create
   * @param {Object} req
   * @param {Object} res
   */
  async createUser(req, res, next) {
    const { body } = req;
    body.email = body.email?.trim(); // 頭尾去空白
    if (!body.email)
      return next(
        new AppError({
          statusCode: 400,
          message: '[新增使用者失敗] email 未填寫',
        })
      );
    body.name = body.name?.trim(); // 頭尾去空白
    if (!body.name)
      return next(
        new AppError({
          statusCode: 400,
          message: '[新增使用者失敗] name 未填寫',
        })
      );
    // 檢查 email 是否已存在 DB
    const existUser = await UserModel.findOne({
      email: body.email,
    });
    if (existUser)
      return next(
        new AppError({
          statusCode: 400,
          message: '[新增使用者失敗] email 已存在',
        })
      );
    const newUser = await UserModel.create({
      name: body.name,
      email: body.email,
      photo: body.photo,
    });
    successResponse(res, newUser);
  },
  /**
   * 刪除所有使用者
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany
   * @param {Object} req
   * @param {Object} res
   */
  async deleteUsers(req, res, next) {
    await UserModel.deleteMany({});
    successResponse(res, []);
  },
  /**
   * 刪除單筆使用者
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndDelete
   * @param {Object} req
   * @param {Object} res
   */
  async deleteUserById(req, res, next) {
    const id = req.params.id;
    const deleteUserById = await UserModel.findByIdAndDelete(id);
    if (!deleteUserById)
      return next(
        new AppError({
          statusCode: 400,
          message: '[刪除使用者失敗] 沒有此 id',
        })
      );
    successResponse(res, deleteUserById);
  },
  /**
   * 修改單筆使用者
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate
   * @param {Object} req
   * @param {Object} res
   */
  async updateUserById(req, res, next) {
    const { body } = req;
    const id = req.params.id;
    if (body.email !== undefined)
      return next(
        new AppError({
          statusCode: 400,
          message: '[修改使用者失敗] 不可修改 email',
        })
      );
    body.name = body.name?.trim(); // 頭尾去空白
    if (!body.name)
      return next(
        new AppError({
          statusCode: 400,
          message: '[修改使用者失敗] name 未填寫',
        })
      );
    const updateUserById = await UserModel.findByIdAndUpdate(
      id,
      {
        name: body.name,
        photo: body.photo,
      },
      {
        // 加這行才會返回更新後的資料，否則為更新前的資料。
        returnDocument: 'after',
        // update 相關語法預設 runValidators: false，需手動設寪 true。Doc:https://mongoosejs.com/docs/validation.html#update-validators
        runValidators: true,
      }
    );
    if (!updateUserById)
      return next(
        new AppError({
          statusCode: 400,
          message: '[修改使用者失敗] 沒有此 id',
        })
      );
    successResponse(res, updateUserById);
  },
};
module.exports = users;
