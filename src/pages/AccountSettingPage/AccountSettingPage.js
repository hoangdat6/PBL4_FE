import React, {useEffect, useState} from "react";
import AccountSettings from "../../components/AccountSettings/AccountSettings";
import UserService from "../../services/user.service";

const AccountSettingPage = () => {
    const [accountInfo, setAccountInfo] = useState({});

    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountInfo((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        UserService.getAccountInfo().then((response) => {
            setAccountInfo(response.data);
        }).catch((error) => {
            console.error(error);
        })
    }, []);

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
