const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");
const uuid = require("uuid");
const { EventEmitter } = require("events");

class Item {
	constructor({ sName, nQuantity = 0, nPrice = 0, sStatus = "active" }) {
		this.iId = uuid.v1();
		this.sName = sName;
		this.nQuantity = nQuantity;
		this.nPrice = nPrice;
		this.sStatus = sStatus;
		this.dCreatedAt = new Date();
		this.dUpdatedAt = new Date();
	}
}

const MIME_TYPES = {
	".txt": "text/plain",
	".html": "text/html",
	".css": "text/css",
	".js": "text/javascript",

	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".png": "image/png",
	".gif": "image/gif",
	".svg": "image/svg+xml",

	".json": "application/json",
	".xml": "application/xml",
	".pdf": "application/pdf",
	".zip": "application/zip",
	".doc": "application/msword",
	".xls": "application/vnd.ms-excel",

	".mpeg": "video/mpeg",
	".mp4": "video/mp4",
};

class MyEmitter extends EventEmitter {
	emitEvent(event, obj) {
		this.emit(event, obj);
	}
}

const myEmitter = new MyEmitter();

myEmitter.on("itemFound", () => {
	console.log("Item found");
});
myEmitter.on("itemNotFound", () => {
	console.log("Item Not found");
});
myEmitter.on("itemsFound", () => {
	console.log("Items found");
});
myEmitter.on("itemsNotFound", () => {
	console.log("Items Not found");
});

myEmitter.on("error", (err) => {
	console.log(err.message);
});

myEmitter.on("newItem", () => {
	console.log("New item added");
});
myEmitter.on("updatedItem", () => {
	console.log("Updated item");
});
myEmitter.on("deleteItem", () => {
	console.log("Deleted item");
});

function checkDataTypes({ sName, nQuantity, nPrice, sStatus }) {
	if (
		(sName && typeof sName !== "string") ||
		(nQuantity && (typeof nQuantity !== "number" || nQuantity < 0)) ||
		(nPrice && (typeof nPrice !== "number" || nPrice < 0)) ||
		(sStatus && typeof sStatus !== "string") ||
		(sStatus && sStatus !== "active" && sStatus !== "inactive")
	) {
		return false;
	}
	return true;
}

function readFile(res, sFilePath = path.join(__dirname, "data.json")) {
	try {
		if (!fs.statSync(sFilePath).isFile()) {
			throw new Error("File not found");
		}
	} catch (err) {
		res.writeHead(404, { "content-type": "text/html" });
		res.end(JSON.stringify(err.message));
		myEmitter.emitEvent("error", err);
		return null;
	}

	let aData = fs.readFileSync(sFilePath).toString();
	return !aData ? [] : JSON.parse(aData);
}

function getIdFromPath(sFilePath) {
	return sFilePath.split("/").pop();
}

const server = http.createServer((req, res) => {
	sReqPath = url.parse(req.url).path;
	sReqQuery = url.parse(req.url).query;

	if (
		req.method === "GET" &&
		(sReqPath === "/api/data" || sReqPath === "/api/data/")
	) {
		let aData = readFile(res);
		if (!aData) {
			return;
		}

		aData = aData.filter((item) => item.sStatus === "active");
		aData.forEach((item) => {
			item.dCreatedAt = item.dCreatedAt.toLocaleString();
			console.log(item.dCreatedAt.toLocaleString());
		});
		if (aData.length === 0) {
			res.writeHead(404, { "content-type": "text/html" });
			res.end(JSON.stringify({ message: "No items found" }));
			myEmitter.emitEvent("itemsNotFound");
			return;
		}

		myEmitter.emitEvent("itemsFound");
		res.writeHead(200, { "content-type": "application/json" });
		res.end(JSON.stringify(aData));
	} else if (req.method === "GET" && sReqPath.startsWith("/api/data")) {
		let iId = getIdFromPath(sReqPath);

		if (!uuid.validate(iId)) {
			res.writeHead(400, { "content-type": "text/html" });
			res.end("Invalid Id");
			return;
		}
		let aData = readFile(res);
		if (!aData) {
			return;
		}

		if (aData.length === 0) {
			res.writeHead(404, { "content-type": "text/html" });
			res.end(JSON.stringify({ message: "No items found" }));
			return;
		}

		let oItem = aData.find(
			(item) => item.iId === iId && item.sStatus === "active"
		);

		if (!oItem) {
			res.writeHead(404, { "content-type": "text/html" });
			res.end(JSON.stringify({ message: "Item not found" }));
			myEmitter.emitEvent("itemNotFound");
			return;
		}

		myEmitter.emitEvent("itemFound");
		res.writeHead(200, { "content-type": "application/json" });
		res.end(JSON.stringify(oItem));
	} else if (req.method === "POST" && sReqPath === "/api/data") {
		let sInputItemData = "";
		req.on("data", (chunk) => {
			sInputItemData += chunk;
		}).on("end", () => {
			try {
				if (!sInputItemData) {
					throw new Error("Invalid Data");
				}
				let oInputItemData = JSON.parse(sInputItemData);

				if (
					typeof oInputItemData !== "object" ||
					!Object.hasOwn(oInputItemData, "sName") ||
					!Object.hasOwn(oInputItemData, "nQuantity") ||
					!Object.hasOwn(oInputItemData, "nPrice") ||
					!checkDataTypes({ ...oInputItemData })
				) {
					throw new Error("Invalid Data");
				}

				for (sKey of Object.keys(oInputItemData)) {
					if (
						!(
							sKey === "sName" ||
							sKey === "nPrice" ||
							sKey === "nQuantity" ||
							sKey === "sStatus"
						)
					) {
						throw new Error("Invalid Data");
					}
				}

				let oNewItem = new Item({
					sName: oInputItemData.sName,
					nQuantity: oInputItemData.nQuantity,
					nPrice: oInputItemData.nPrice,
					sStatus: oInputItemData.sStatus,
				});

				let aData = readFile(res);
				if (!aData) {
					return;
				}

				aData.forEach((item) => {
					if (item.sName === oNewItem.sName) {
						throw new Error("Item with this name already exist");
					}
				});

				aData.push(oNewItem);

				fs.writeFile(
					path.join(__dirname, "data.json"),
					JSON.stringify(aData),
					(err) => {
						if (err) {
							res.writeHead(500, {
								"content-type": "text/html",
							});
							res.end("Internal server error");
						}

						res.writeHead(201, { "content-type": "text/html" });
						res.end("New Item created successfully");
						myEmitter.emitEvent("newItem");
					}
				);
			} catch (err) {
				myEmitter.emitEvent("error", err);
				res.writeHead(400, { "content-type": "text/html" });
				res.end(err.message);
			}
		});
	} else if (req.method === "PATCH" && sReqPath.startsWith("/api/data")) {
		let iId = getIdFromPath(sReqPath);

		if (!uuid.validate(iId)) {
			res.writeHead(400, { "content-type": "text/html" });
			res.end("Invalid Id");
			return;
		}

		let sInputItemData = "";
		req.on("data", (chunk) => {
			sInputItemData += chunk;
		}).on("end", () => {
			try {
				if (!sInputItemData) {
					throw new Error("Invalid Data");
				}
				let oUpdateItemData = JSON.parse(sInputItemData);
				if (
					typeof oUpdateItemData !== "object" ||
					Object.keys(oUpdateItemData).length === 0 ||
					!checkDataTypes({ ...oUpdateItemData })
				) {
					throw new Error("Invalid Data");
				}
				for (sKey of Object.keys(oUpdateItemData)) {
					if (
						!(
							sKey === "sName" ||
							sKey === "nPrice" ||
							sKey === "nQuantity" ||
							sKey === "sStatus"
						)
					) {
						throw new Error("Invalid Data");
					}
				}

				aData = readFile(res);
				if (!aData) {
					return;
				}

				if (!aData.find((item) => item.iId === iId)) {
					throw new Error("Item with this id does not exist");
				}

				if (Object.hasOwn(oUpdateItemData, "sName")) {
					aData.forEach((item) => {
						if (item.sName === oUpdateItemData.sName) {
							throw new Error(
								"Item with this name already exist"
							);
						}
					});
				}
				oUpdateItemData.dUpdatedAt = new Date();
				let aNewData = aData.map((item) => {
					return item.iId === iId
						? { ...item, ...oUpdateItemData }
						: item;
				});

				fs.writeFile(
					path.join(__dirname, "data.json"),
					JSON.stringify(aNewData),
					(err) => {
						if (err) {
							res.writeHead(500, {
								"content-type": "text/html",
							});
							res.end("Internal server error");
						}

						res.writeHead(200, { "content-type": "text/html" });
						res.end("Item updated successfully");
						myEmitter.emitEvent("updatedItem");
					}
				);
			} catch (err) {
				myEmitter.emitEvent("error", err);
				res.writeHead(400, { "content-type": "text/html" });
				res.end(err.message);
				return;
			}
		});
	} else if (req.method === "DELETE" && sReqPath.startsWith("/api/data")) {
		let iId = getIdFromPath(sReqPath);

		if (!uuid.validate(iId)) {
			res.writeHead(400, { "content-type": "text/html" });
			res.end("Invalid Id");
			return;
		}

		let aData = readFile(res);
		if (!aData) {
			return;
		}

		try {
			let objIdx = aData.findIndex((item) => item.iId === iId);
			if (objIdx === -1) {
				throw new Error("Item with this id does not exist");
			}

			aData.splice(objIdx, 1);
		} catch (err) {
			myEmitter.emitEvent("error", err);
			res.writeHead(400, { "content-type": "text/html" });
			res.end(err.message);
			return;
		}

		fs.writeFile(
			path.join(__dirname, "data.json"),
			JSON.stringify(aData),
			(err) => {
				if (err) {
					res.writeHead(500, {
						"content-type": "text/html",
					});
					res.end("Internal server error");
				}

				res.writeHead(200, { "content-type": "text/html" });
				res.end("Item deleted successfully");
				myEmitter.emit("deleteItem");
			}
		);
	} else if (
		req.method === "GET" &&
		(sReqPath.startsWith("/public") || sReqPath.startsWith("/public/"))
	) {
		const file = sReqPath.split("/").pop();
		const filePath = path.join(__dirname, "public", file);
		const ext = path.extname(filePath);
		fs.readFile(filePath, (err, data) => {
			if (err || !fs.statSync(filePath).isFile()) {
				res.writeHead(404, { "content-type": "text/html" });
				res.end("File Not Found");
				return;
			}
			res.writeHead(200, { "content-type": MIME_TYPES[ext] });
			res.end(data);
		});
	} else {
		res.writeHead(404, { "content-type": "text/html" });
		res.end(JSON.stringify({ message: "Route not found" }));
	}
});

server.listen(3000, (err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log("server listening on http://localhost:3000");
});