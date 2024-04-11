export default interface Elevator {
    destinationQueue: number[];

    goToFloor(floorNumber: number): void;
    stop(): void;
    currentFloor(): number;
    goingUpIndicator(setValue?: boolean): boolean;
    goingDownIndicator(setValue?: boolean): boolean;
    maxPassengerCount(): number;
    loadFactor(): number;
    destinationDirection(): "up" | "down" | "stopped";
    getPressedFloors(): number[];
    checkDestinationQueue(): void;

    on(event: "idle", listener: () => void): this;
    on(event: "floor_button_pressed", listener: (floorNum: number) => void): this;
    on(event: "passing_floor", listener: (floorNum: number, direction: "up" | "down") => void): this;
    on(event: "stopped_at_floor", listener: (floorNum: number) => void): this;
}