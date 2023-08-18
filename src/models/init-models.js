import { DataTypes } from "sequelize";
import _post_contenu from "./post_contenu.js";

function initModels(sequelize) {
  var post_contenu = _post_contenu(sequelize, DataTypes);


  return {
    post_contenu,
  };
}
export default initModels;
