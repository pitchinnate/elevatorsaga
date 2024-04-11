export default interface Floor {
    floorNum(): number;
    on(event: "up_button_pressed", listener: () => void): this;
    on(event: "down_button_pressed", listener: () => void): this;
};
