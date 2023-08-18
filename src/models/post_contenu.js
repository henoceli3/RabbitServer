import Sequelize from 'sequelize';
export default function(sequelize, DataTypes) {
  return sequelize.define('post_contenu', {
    idcarte: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    idmembre: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idtype: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true
    },
    fichier: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    titre_1: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    titre_2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    memo: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    datecrea: {
      type: DataTypes.DATE,
      allowNull: true
    },
    idcateg: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true
    },
    lienvideo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    thb: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    declarercarte: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    vue: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    aime: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    com: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    share: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    etat: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1
    },
    adstype: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    adsactiontype: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    adsactionlib: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: true,
      defaultValue: 99999
    },
    adsactionurl: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      defaultValue: ""
    },
    idproprio: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'post_contenu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idcarte" },
        ]
      },
    ]
  });
};
