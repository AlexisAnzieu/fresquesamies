"use client";

import {
    Card,
    CardBody,
    Container,
    Text,
    SimpleGrid,
    Box,
    CardHeader,
    Heading,
    Select,
    Stack,
    StackDivider,
    Link,
    Input,
} from "@chakra-ui/react";
import { CalendarIcon, ExternalLinkIcon } from "@chakra-ui/icons";

async function getData() {
    const res = await fetch("https://sheetdb.io/api/v1/0ezl9ai5yr34c");
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

const extractColor = (avancement: string) => {
    const mapping: Record<string, string> = {
        "En création": "red",
        "En rodage": "orange",
        "En usage": "green",
    };

    return mapping[avancement] || "gray";
};

export default async function Home() {
    const data = await getData();
    return (
        <Container maxW="container.xl" p={5}>
            <Box py={5}>
                {" "}
                <Input
                    size={"lg"}
                    variant="flushed"
                    placeholder="Rechercher une fresque"
                />
            </Box>

            <Box width={["100%", 350]} py={5}>
                {" "}
                <Select size="lg">
                    <option value="option1">
                        De la plus vieille à la plus récente
                    </option>
                    <option value="option1">
                        De la plus récente à la plus vieille
                    </option>
                    <option value="option2">Alphabétique A-Z</option>
                    <option value="option2">Alphabétique Z-A</option>
                </Select>
            </Box>

            <SimpleGrid columns={[1, 1, 2, 3]} spacing={10}>
                {data.map((item: any, id: number) => (
                    <Card
                        boxShadow={"xl"}
                        key={id}
                        border={"1px"}
                        borderColor={extractColor(item.Avancement.trim())}
                    >
                        <CardHeader>
                            <Heading size="md" noOfLines={2}>
                                {item["Titre de la fresque"]}
                            </Heading>
                            <Box noOfLines={2}>
                                {" "}
                                par {item["Association porteuse"]}
                            </Box>
                        </CardHeader>

                        <CardBody>
                            <Stack divider={<StackDivider />} spacing="4">
                                <Box>
                                    <CalendarIcon boxSize={6} />{" "}
                                    {item["Date de création"]}
                                    <br />
                                    <br />
                                    {item["Site internet"]
                                        .split(/,| |\n/)
                                        .filter((w: string) =>
                                            w.includes("http")
                                        )
                                        .map((website: string, id: number) => (
                                            <Box key={id}>
                                                <Link href={website} isExternal>
                                                    {website}{" "}
                                                    <ExternalLinkIcon mx="2px" />
                                                </Link>
                                            </Box>
                                        ))}
                                </Box>
                                <Box>
                                    <Heading
                                        size="xs"
                                        textTransform="uppercase"
                                    >
                                        Description
                                    </Heading>
                                    <Text pt="2" fontSize="sm" noOfLines={5}>
                                        {item["Description"]}
                                    </Text>
                                </Box>
                                <Box>
                                    {item["Contact"]
                                        .split(/,| |\n/)
                                        .filter((email: any) =>
                                            email.includes("@")
                                        )
                                        .map((email: any, id: number) => (
                                            <Box key={id}>
                                                <a href={`mailto: ${email}`}>
                                                    {email}
                                                </a>
                                            </Box>
                                        ))}
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </Container>
    );
}
