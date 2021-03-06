const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

const admin = require("firebase-admin");

const db = admin.firestore();



exports.createNewProduct = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        let totalNumberOfOrders;
        let totalNumberOfUsers;
        let totalNumberOfProducts;
        let productId = "";
        let product = request.body.data;
        console.log(product);
        let promises = [];
        const promise1 = db.collection("RawData").doc("AppDetails").get().then((doc) => {
            if (doc.exists) {
                if (product.Mode === "Add") {
                    totalNumberOfOrders = doc.data().TotalNumberOfOrders;
                    totalNumberOfUsers = doc.data().TotalNumberOfUsers;
                    totalNumberOfProducts = doc.data().TotalNumberOfProducts + 1;
                    productId = "P" + totalNumberOfProducts;
                    const p1 = db.collection("Products").doc(productId).set({
                        Id: productId,
                        Name: product.Name,
                        Description: product.Description,
                        ImageURL: product.ImageURL,
                        ActualPrice: product.ActualPrice,
                        DiscountPrice: product.DiscountPrice,
                        Availability: product.Availability,
                    });
                    promises.push(p1);
                } else {
                    totalNumberOfOrders = doc.data().TotalNumberOfOrders;
                    totalNumberOfUsers = doc.data().TotalNumberOfUsers;
                    totalNumberOfProducts = doc.data().TotalNumberOfProducts;
                    const p1 = db.collection("Products").doc(product.ProductId).update({
                        Name: product.Name,
                        Description: product.Description,
                        ActualPrice: product.ActualPrice,
                        DiscountPrice: product.DiscountPrice,
                        Availability: product.Availability,
                    });
                    promises.push(p1);
                }
                const p2 = db.collection("RawData").doc("AppDetails").update({
                    TotalNumberOfOrders: totalNumberOfOrders,
                    TotalNumberOfUsers: totalNumberOfUsers,
                    TotalNumberOfProducts: totalNumberOfProducts
                });
                promises.push(p2);
            }
            return Promise.all(promises);
        });
        Promise.resolve(promise1)
            .then(() => {
                result = { data: "Product Created/Modified Successfully" };
                console.log("Product Created/Modified Successfully");
                return response.status(200).send(result);
            })
            .catch((error) => {
                result = { data: error };
                console.error("Error Creating/Modifying Product", error);
                return response.status(500).send(result);
            });
    })
});