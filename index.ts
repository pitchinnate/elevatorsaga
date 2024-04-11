import Floor from './floor';
import Elevator from './elevator';

const answer = {
    init: function(elevators: Elevator[], floors: Floor[]) {
        const smallQueue = (floorNum) => {
            let smallQueue = 1000;
            let smallQueueElevator = elevators[0];
            let breakOut = false;

            elevators.forEach((elevator, index) => {
                if (elevator.loadFactor() === 1 || breakOut) {
                    return;
                }
                if (elevator.destinationQueue.length === 0) {
                    smallQueue = elevator.destinationQueue.length;
                    smallQueueElevator = elevator;
                    breakOut = true;
                }
                const foundIndex = elevator.destinationQueue.findIndex((elevatorIndex) => elevatorIndex === floorNum);
                if (foundIndex >= 0) {
                    smallQueue = elevator.destinationQueue.length;
                    smallQueueElevator = elevator;
                    breakOut = true;
                }
                if (elevator.destinationQueue.length < smallQueue) {
                    smallQueue = elevator.destinationQueue.length;
                    smallQueueElevator = elevator;
                }
            });
            return smallQueueElevator;
        };
        elevators.forEach((elevator, index) => {
            elevator.on('floor_button_pressed', (floorNum) => {
                elevator.goToFloor(floorNum);
            })
            elevator.on('idle', () => {
                elevator.goToFloor(index);
            });
            elevator.on('passing_floor', (floorNum) => {
                const foundIndex = elevator.destinationQueue.findIndex((elevatorIndex) => elevatorIndex === floorNum);
                if (foundIndex >= 0) {
                    const filterQueue = elevator.destinationQueue.filter((num) => num !== floorNum);
                    elevator.destinationQueue = [floorNum, ...filterQueue];
                    elevator.checkDestinationQueue();
                }
            });
        });
        floors.forEach((floor) => {
            floor.on("up_button_pressed", () => {
                const elevator = smallQueue(floor.floorNum());
                elevator.goToFloor(floor.floorNum());
            })
            floor.on("down_button_pressed", () => {
                const elevator = smallQueue(floor.floorNum());
                elevator.goToFloor(floor.floorNum());
            })
        });
    },
    update: function(dt: any, elevators: Elevator[], floors: Floor[]) {
        // We normally don't need to do anything here
    }
}