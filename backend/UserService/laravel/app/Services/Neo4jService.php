<?php

namespace App\Services;

use Laudis\Neo4j\ClientBuilder;
use Laudis\Neo4j\Authentication\Authenticate;

class Neo4jService
{
    private $client;

    public function __construct()
    {
        $this->client = ClientBuilder::create()
            ->withDriver(
                'bolt',
                env('NEO4J_URI'),
                Authenticate::basic(env('NEO4J_USERNAME'), env('NEO4J_PASSWORD'))
            )
            ->build();
    }

    public function createUserNode(array $data)
    {
        $data['uuid'] = \Ramsey\Uuid\Uuid::uuid4()->toString();
        $query = '
            CREATE (u:User {
                id: $uuid,
                name: $name,
                surname: $surname,
                email: $email,
                password: $password,
                age: $age,
                gender: $gender,
                phoneNumber: $phoneNumber,
                city: $city,
                country: $country,
                picture: $picture,
                role: $role,
                description: $description,
                active: $active,
                createdAt: datetime()
            })
            RETURN u
        ';

        $result = $this->client->run($query, $data);
        $node = $result->first()->get('u');

        return $node->toArray();
    }

    public function getUserByEmail(string $email): ?array
    {
        $query = 'MATCH (u:User {email: $email}) RETURN u LIMIT 1';
        $result = $this->client->run($query, ['email' => $email]);

        if ($result->count() === 0) {
            return null;
        }

        $node = $result->first()->get('u');

        return $node->toArray();
    }

    public function updateUserNode(string $id, array $data): ?array
    {
        $query = '
            MATCH (u:User {email: $id})
            SET u.name = $name,
                u.surname = $surname,
                u.age = $age,
                u.gender = $gender,
                u.phoneNumber = $phoneNumber,
                u.description = $description,
                u.picture = $picture,
                u.city = $city,
                u.country = $country
            RETURN u
        ';

        $result = $this->client->run($query, array_merge(['id' => $id], $data));

        if ($result->count() === 0) {
            return null;
        }
        $node = $result->first()->get('u');

        return $node->toArray();
    }

    public function getUsers(array $filters, int $page = 1, int $perPage = 9): array
    {
        $params = [
            'city' => $filters['city'] ?? null,
            'country' => $filters['country'] ?? null,
            'language' => $filters['language'] ?? null,
            'currentUserId' => $filters['currentUserId'] ?? null,
            'skip' => ($page - 1) * $perPage,
            'limit' => $perPage
        ];

        $query = 'MATCH (u:User)-[:LEARNS]->(l:Language)
                  WHERE u.active = true AND l.know = false ';

        if ($params['language']) {
            $query .= 'AND toLower(l.name) = toLower($language) ';
        }

        if ($params['city']) {
            $query .= 'AND u.city = $city ';
        }

        if ($params['country']) {
            $query .= 'AND u.country = $country ';
        }

        if ($params['currentUserId']) {
            $query .= 'AND u.email <> $currentUserId ';
        }

        $query .= 'RETURN u, collect(l) AS languages
                   SKIP $skip LIMIT $limit';

        $result = $this->client->run($query, $params);

        $users = [];
        foreach ($result->records() as $record) {
            $userNode = $record->get('u');
            $languages = $record->get('languages');

            $users[] = array_merge(
                $userNode->toArray(),
                ['learningLanguages' => array_map(fn(Node $lang) => $lang->get('name'), iterator_to_array($languages))]
            );
        }

        return $users;
    }

    public function createFriendship(int $userId, int $friendId, bool $active = true): array
    {
        $query = '
            MATCH (u:User), (f:User)
            WHERE ID(u) = $userId AND ID(f) = $friendId
            MERGE (u)-[r:FRIEND]->(f)
            RETURN u, f, r
        ';

        $params = [
            'userId' => $userId,
            'friendId' => $friendId,
        ];

        $result = $this->client->run($query, $params);

        if ($result->count() === 0) {
            return [];
        }

        $record = $result->first();

        return [
            'user' => $record->get('u')->toArray(),
            'friend' => $record->get('f')->toArray(),
        ];
    }

    public function getFriendsOfUser(string $userId): array
    {
        $query = '
            MATCH (u:User {id: $userId})-[r:FRIEND]->(f:User)
            RETURN f, r
        ';

        $result = $this->client->run($query, ['userId' => $userId]);

        $friends = [];

        foreach ($result as $record) {
                $node = $record->get('f');
                $friends[] = $node->toArray();
            }

        return $friends;
    }

    public function getUsersByIds(array $ids): array
    {
        $query = '
            MATCH (u:User)
            WHERE id(u) IN $ids
            RETURN id(u) as id, u
        ';

        $result = $this->client->run($query, ['ids' => $ids]);

        $users = [];

        foreach ($result as $record) {
            $node = $record->get('u');

            $users[] = array_merge(
                ['id' => $record->get('id')],
                $node->toArray()
            );
        }

        return $users;
    }
}
