import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import TopNav from "../components/TopNav";

describe("<TopNav/>", () => {
    let getByTestId;

    afterEach(cleanup);

    describe("Find Menu Items", () => {
        let sendHandler;

        beforeEach(() => {
            sendHandler = jest.fn();

            ({ getByTestId } = render(<TopNav />));
            // ({ getByTestId } = render(<Home onSend={sendHandler} />));

            fireEvent.change(getByTestId("messageText"), {
                target: {
                    value: "New message"
                }
            });

            fireEvent.click(getByTestId("sendButton"));
        });

        it("clears the text field", () => {
            expect(getByTestId("messageText").value).toEqual("");
        });

        it("calls the send handler", () => {
            expect(sendHandler).toHaveBeenCalledWith("New message");
        });
    });
});
