  function arrayToFormData(data, formData, previousKey, index) {
    if (!(data instanceof Object)) return false;

    if (formData === undefined) formData = new FormData;

    Object.keys(data).forEach(function (key, j) {

      const value = data[key];
      var curKey = key;
      if (previousKey) {
        curKey = `${previousKey}[${j}].${key}`;
        if (index !== undefined) {
          //curKey = `${previousKey}[${index}][${j}].${key}`;
          curKey = `${previousKey}[${index}].${key}`;
        }
      }
      if (value instanceof Object && !Array.isArray(value)) {
        arrayToFormData(value, formData, curKey);
      }
      if (Array.isArray(value)) {
        value.forEach(function (val, i) {

          if (!(val instanceof Object)) {
            formData.append(`${curKey}[${i}]`, val);
          }
          arrayToFormData(val, formData, curKey, i);

        });
      } else {
        if (!(value instanceof Object)) {
          formData.append(curKey, value);
        }

      }

    });

    return formData;
  }


  var my = {
    'marque': 'Renault',
    'modèle': 'Clio'
  };
  my.vegetaux = [];
  my.vegetaux.push({
    'fruits': ['banane', 'pomme', 'citron']
  });
  my.vegetaux.push({
    'légumes': ['tomate', 'asperge']
  });


  var my2 = {
    "groupOrderNumber": "456",
    "email": "bbastien@fvi.com"
  };

  my2.orders = [];
  var order = {};
  var i = 108;
  //order[`order${i}`] 
  order = {
    "orderStatus": 1,
    "comment": "",
    "orderNumber": 108,
    "modifiedStoreQuantities": [],
    "modifiedServiceDates": [],
    "cleanItem": true
  };
  my2.orders.push(order);

  i = 457;
  order = {};
  order = {
    "orderStatus": 3,
    "comment": "",
    "orderNumber": 457,
    "modifiedStoreQuantities": [],
    "modifiedServiceDates": [],
    "cleanItem": true
  };
  my2.orders.push(order);

  my2.orders[0].modifiedStoreQuantities.push({
    sku: "KDZE0554534",
    allday: true,
    start: "21358743843",
    end: "543548543",
    productId: "8540"
  });
  my2.orders[1].modifiedServiceDates.push({
    sku: "HREG54534",
    allday: true,
    start: "213415315",
    end: "847684638",
    productId: "8665"
  });
  my2.orders[1].modifiedServiceDates.push({
    sku: "HREG54534",
    allday: true,
    start: "213415315",
    end: "847684638",
    productId: "8665"
  });


  my3 = {
    "groupOrderNumber": "456",
    "email": "bbastien@fvi.com",
    "orders": [{
      "orderStatus": 1,
      "comment": "",
      "orderNumber": 108,
      "modifiedStoreQuantities": [],
      "modifiedServiceDates": [],
      "cleanItem": true
    }, {
      "orderStatus": 1,
      "comment": "",
      "orderNumber": 457,
      "modifiedStoreQuantities": [],
      "modifiedServiceDates": [],
      "cleanItem": true
    }]
  };

  var res = arrayToFormData(my);
  console.log('');

  for (var pair of res.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }

  console.log('');
  console.log(JSON.stringify(my));

  res = arrayToFormData(my2);
  console.log('');

  for (var pair of res.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }

  console.log('');
  console.log(JSON.stringify(my2));


  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:1234');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr);
    } else {
      console.log(xhr.status);
    }
  }
  xhr.send(res);