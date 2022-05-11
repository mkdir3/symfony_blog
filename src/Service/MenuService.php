<?php

namespace App\Service;

use App\Entity\Menu;
use App\Repository\MenuRepository;

class MenuService
{
   public function __construct(private MenuRepository $menuRepository)
   {
      
   }

    /**
     * Undocumented function
     *
     * @return array Menu[]
     */
   public function findAll(): array
   {
       return $this->menuRepository->findAllForTwig();
   }
}