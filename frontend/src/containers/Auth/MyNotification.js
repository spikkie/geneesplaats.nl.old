function MyNotification() {
    return (
        <div
            style={{
                display: "flex",
                backgroundColor: "#0f2f26",
                borderRadius: 5
            }}
        >
            <AlligatorAvatar />
            <div>
                <h4>Alligator.io</h4>
                <p>Has joined the chat</p>
            </div>
        </div>
    );
}
