import { Firestore } from ".";
import { db } from "..";
import { Utils } from "../../utils";

const customerRef = db.collection("customers");

async function create(customer) {
    const snapshotByPhoneNumber = await customerRef.where("phoneNumber", "==", customer.phoneNumber).get();

    if (!snapshotByPhoneNumber.empty) {
        return Utils.createMessage("error", `Số điện thoại ${customer.phoneNumber} đã tồn tại`);
    } else {
        const res = await Firestore.create('customers', customer);

        if (res.status === 'error') {
            return Utils.createMessage("error", "Tạo khách hàng thất bại")
        }

        return Utils.createMessage("success", "Tạo khách hàng thành công", res.data)
    }
}

async function update(customerID, data) {
    const res = await Firestore.update('customers', customerID, data);

    if (res.status === 'error') {
        return Utils.createMessage("error", "Chỉnh sửa thông tin khách hàng thất bại")
    }

    return Utils.createMessage("success", "Chỉnh sửa thông tin khách hàng thành công", res.data)
}

async function remove(customerID) {
    const res = await Firestore.remove('customers', customerID);

    if (res.status === 'error') {
        return Utils.createMessage("error", "Xóa khách hàng lỗi")
    }

    return Utils.createMessage("success", "Xoá khách hàng thành công")
}

async function getOneById(customerID) {
    const res = await Firestore.getOneById('customers', customerID);

    if (res.status === 'error') {
        return Utils.createMessage("error", "Lấy khách hàng lỗi")
    }

    return Utils.createMessage("success", "Lấy khách hàng thành công", res.data)
}

async function getAll(pageNumber, pageSize) {
    const res = await Firestore.getAll("customers", "createdAt", pageNumber, pageSize);

    if (res.status === 'error') {
        return Utils.createMessage("error", "Lấy danh sách khách hàng lỗi")
    }

    return Utils.createMessage("success", "Lấy danh sách khách hàng thành công", res.data);
}

async function getTotal() {
    const res = await Firestore.getTotal("customers");

    if (res.status === 'error') {
        return Utils.createMessage("error", "Lấy tổng số khách khách hàng lỗi");
    }

    return Utils.createMessage("success", "Lấy tổng số khách hàng thành công", res.total);
}

export const CustomerRepo = { create, getOneById, getAll, getTotal, remove, update };