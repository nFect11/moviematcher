import MenuButton from "./buttons/MenuButton";

export default function MainMenu() {
    return (
        <div>
            <div
                id="menu"
                className="flex flex-col gap-y-4 w-4/5 md:w-3/5 lg:w-1/2 justify-items-center items-center mx-auto"
            >
                <MenuButton to="/create" menuName="CREATE" />
                <MenuButton to="/join" menuName="JOIN" />
                <MenuButton to="/howtoplay" menuName="HOW TO PLAY" />
            </div>
        </div>
    );
}
