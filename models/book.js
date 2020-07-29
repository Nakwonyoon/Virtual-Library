module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define("Book", {
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
          type: DataTypes.DATE,
          allowNull: true
      },
      genre: {
          type: DataTypes.STRING,
          allowNull: false
      },
      synopsis: {
          type: DataTypes.TEXT,
          allowNull: false
      },
      hasRead: {
          type: DataTypes.BOOLEAN
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