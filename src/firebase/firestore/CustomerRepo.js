import { Firestore } from ".";
import { db } from "..";

const customerRef = db.collection("customer");

async function create(customer) {
    const snapshotByPhoneNumber = await customerRef.where("phoneNumber", "==", customer.phoneNumber).get();
    if (!snapshotByPhoneNumber.empty) {
        return {
            status: "error",
            message: `Số điện thoại ${customer.phoneNumber} đã tồn tại`,
        };
    } else {
        const { id } = await Firestore.create('customer', customer)
        return {
            status: "success",
            message: "Tạo khách hàng thành công",
            id,
        };
    }
}

async function getCustomerList(pageNumber, pageSize) {
    try {
        const customerList = await Firestore.getData("customer", "createdAt", pageNumber, pageSize);
        return {
            status: "success",
            message: "Lấy danh sách khách hàng thành công",
            data: customerList,
        };
    } catch (e) {
        return {
            status: "error",
            message: "Lấy danh sách khách hàng lỗi",
        };
    }
}

async function getTotalCustomers() {
    try {
        const total = await Firestore.getTotalItems("customer");
        return {
            status: "success",
            message: "Lấy tổng số khách hàng thành công",
            data: total,
        };
    } catch (e) {
        return {
            status: "error",
            message: "Lấy tổng số khách khách hàng lỗi",
        };
    }
}

export const CustomerRepo = { create, getCustomerList, getTotalCustomers };