import { Grid, Skeleton, Container } from "@mantine/core";

const HomeMainContent = () => {
  return (
    <Container size="2xl" py="md">
      <Grid grow gutter="xl" gutterMd={50}>
        <Grid.Col md={10} lg={10}>
          <Skeleton height={450} radius="lg" />
        </Grid.Col>
        <Grid.Col md={6} lg={6}>
          <Skeleton height={450} radius="lg" />
        </Grid.Col>
        <Grid.Col md={6} lg={6}>
          <Skeleton height={450} radius="lg" />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default HomeMainContent;
