import { Grid, Skeleton, Container } from "@mantine/core";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";

const HomeMainContent = () => {
  const { userData } = useContext(AuthContext);
  const { cameras } = userData || {};

  return (
    <Container size="2xl" py="md">
      <Grid grow gutter="xl" gutterMd={50}>
        {cameras &&
          cameras.map((camera) => (
            <Grid.Col key={camera.id} lg={5}>
              <Link to={`/camera/${camera.id}`}>
                <Skeleton
                  className="hover:scale-20 relative cursor-pointer hover:transform hover:shadow-xl"
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
