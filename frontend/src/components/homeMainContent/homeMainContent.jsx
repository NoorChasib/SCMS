import { Grid, Skeleton, Container } from "@mantine/core";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import ThemeContext from "../../contexts/themeContext";
import { useContext } from "react";

const HomeMainContent = () => {
  const { userData } = useContext(AuthContext);
  const { cameras } = userData || {};
  const { darkMode } = useContext(ThemeContext);

  return (
    <Container size="2xl" py="md">
      <Grid grow gutter="xl" gutterMd={50}>
        {cameras &&
          cameras.map((camera) => (
            <Grid.Col key={camera.id} lg={5}>
              <Link to={`/camera/${camera.id}`}>
                <Skeleton
                  className={`hover:scale-25 relative cursor-pointer hover:transform hover:shadow-lg ${
                    darkMode ? "hover:shadow-gray-500" : "hover:shadow-gray-300"
                  }`}
                  height={450}
                  radius="lg"
                />
              </Link>
            </Grid.Col>
          ))}
      </Grid>
    </Container>
  );
};

export default HomeMainContent;
