import React, { useState } from "react";
import AccountSettings from "../../components/AccountSettings/AccountSettings";

const AccountSettingPage = () => {
    const [accountInfo, setAccountInfo] = useState({
        displayName: "Văn Đạt Hoàng",
        email: "dathv2004@gmail.com",
        userId: "66ddcc3279e36b6cecc85998",
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert("Thông tin đã được cập nhật!");
        }, 1000);
    };

    const handleDeleteAccount = () => {
        const confirmed = window.confirm(
            "Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác."
        );
        if (confirmed) {
            alert("Tài khoản của bạn đã bị xóa.");
        }
    };

    return (
        <AccountSettings
            accountInfo={accountInfo}
            isSaving={isSaving}
            onChange={handleChange}
            onUpdate={handleUpdate}
            onDelete={handleDeleteAccount}
        />
    );
};

export default AccountSettingPage;
