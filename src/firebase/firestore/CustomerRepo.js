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
        console.log('res: ', res);

        if (res.status === 'error') {
            return Utils.createMessage("error", "Tạo khách hàng thất bại")
        }
        return Utils.createMessage("success", "Tạo khách hàng thành công", res.data)
    }
}

async function remove(customerID) {
    const res = await Firestore.remove('customers', customerID);

    if (res.status === 'error') {
        return Utils.createMessage("error", "Xóa khách hàng lỗi")
    }
    return Utils.createMessage("success", "Xoá khách hàng thành công")
}

async function getCustomerList(pageNumber, pageSize) {
    const res = await Firestore.getData("customers", "createdAt", pageNumber, pageSize);

    if (res.status === 'error') {
        return Utils.createMessage("error", "Lấy danh sách khách hàng lỗi")
    }
    return Utils.createMessage("success", "Lấy danh sách khách hàng thành công", res.data);
}

async function getTotalCustomers() {
    const res = await Firestore.getTotalItems("customers");

    if (res.status === 'error') {
        return Utils.createMessage("error", "Lấy tổng số khách khách hàng lỗi");
    }
    return Utils.createMessage("success", "Lấy tổng số khách hàng thành công", res.total);
}

export const CustomerRepo = { create, getCustomerList, getTotalCustomers, remove };