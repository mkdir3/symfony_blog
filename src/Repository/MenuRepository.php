<?php

namespace App\Repository;

use App\Entity\Menu;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Menu>
 *
 * @method Menu|null find($id, $lockMode = null, $lockVersion = null)
 * @method Menu|null findOneBy(array $criteria, array $orderBy = null)
 * @method Menu[]    findAll()
 * @method Menu[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MenuRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Menu::class);
    }

public function getIndexQueryBuilder(string $field)
{
    return $this->createQueryBuilder('m')
                ->where("m.$field IS NOT NULL OR (m.page IS NULL AND m.article IS NULL AND m.link IS NULL AND m.category IS NULL)");
}

/**
 * findall
 *
 * @return array Menu[]
 */
public function findAllForTwig(): array
{
    return $this->createQueryBuilder('m')
                ->where('m.isVisible = true')
                ->orderBy('m.menuOrder')
                ->getQuery()
                ->getResult();
}
}
