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