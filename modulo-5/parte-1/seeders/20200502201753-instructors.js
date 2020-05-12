'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Instructors', [
    {
      "id": 1,
      "avatar_url": "https://images.unsplash.com/photo-1526405294019-7f3f7c8c7867?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      "name": "Marcos Trombante",
      "birth": "2020-05-01 11:37:25.453603+00",
      "gender": "M",
      "services": "Musculação, Crossfit, Natação",
      "created_at": "2020-05-02 11:37:25.453603+00"
    },
    {
      "id": 2,
      "avatar_url": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80",
      "name": "Aline Nubia",
      "birth": "2020-05-01 10:37:25.453603+00",
      "gender": "F",
      "services": "Musculação, Crossfit",
      "created_at": "2020-05-02 10:37:25.453603+00"
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Instructors', null, {}),
};
