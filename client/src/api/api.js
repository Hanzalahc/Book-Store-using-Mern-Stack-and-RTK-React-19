const apis = () => {
  const local = "http://localhost:8000/";

  const list = {
    // Image
    image: {
      url: `${local}gallery/upload`,
      method: "POST",
    },

    // Book
    getAllBooks: {
      url: `${local}book/all`,
      method: "GET",
    },
    getBook: {
      url: `${local}book/single/`,
      method: "GET",
    },
    deleteBook: {
      url: `${local}book/delete/`,
      method: "DELETE",
    },
    addBook: {
      url: `${local}book/create`,
      method: "POST",
    },
    updateBook: {
      url: `${local}book/update/`,
      method: "PUT",
    },

    // Order
    createOrder: {
      url: `${local}order/create`,
      method: "POST",
    },
    getUserOrders: {
      url: `${local}order/user`,
      method: "GET",
    },

    // admin auth
    adminLogin: {
      url: `${local}user/login`,
      method: "POST",
    },
    adminLogout: {
      url: `${local}user/logout`,
      method: "GET",
    },
    currentAdmin: {
      url: `${local}user/current-user`,
      method: "GET",
    },

    // admin stats
    adminStats: {
      url: `${local}admin-stats/`,
      method: "GET",
    },
  };

  return list;
};

export default apis;
