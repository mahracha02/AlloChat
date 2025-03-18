<?php

namespace App\ApiRessource;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Get(),
        new Post()
    ],
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']]
)]
class User
{
    #[Groups(['user:read', 'user:write'])]
    public ?int $id = null;
    
    #[Groups(['user:read', 'user:write'])]
    public string $username;
    
    #[Groups(['user:read', 'user:write'])]
    public string $email;
    
    #[Groups(['user:write'])]
    public string $password;
}
