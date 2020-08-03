module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define("Book", {
    goodReadsId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    publishDate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // synopsis: {
    //   type: DataTypes.TEXT,
    //   allowNull: false
    // },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hasRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,

    }
  });

  Book.associate = function(models) {
    Book.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Book;
};
