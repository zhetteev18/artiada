$assets = "C:\Users\Kubal\.cursor\projects\c-Users-Kubal-Desktop\assets"
$base = "c:\Users\Kubal\Desktop\Сайт\public\images"

$ordered = @(
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_ChatGPT_Image_25_____2026__.__16_16_41-7be0e2c8-8527-4df3-ad81-55043f7ba290.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images__WhatsApp_2025-06-08__1_-f36daf1c-71d4-4164-a170-656a4b03d2e2.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images__WhatsApp_2025-06-08__2_-22f1af35-8da5-461e-a0bf-434339078e3d.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_-KK3MCEyac8-adf8b4ca-d1f5-4778-bd01-2feac2ed674e.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_NX89Di06Jl4-fa3dcde0-1e92-404e-a409-62540756ca27.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_aCjFOTnIN9M-d7de4b47-ac9b-467d-b608-009a0a0377be.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_6jivNNYVaMA-4855fd3a-41b7-40a7-a403-f543d520d316.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_2-6679c2cd-4bdf-4c2b-b5fd-2c0f11891e3e.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_1-b41c1e06-a9be-4261-8493-91e5356bf468.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_36-3639f776-1722-4a99-9114-327526a38e4f.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_4-0c9ccfbb-ad8b-43da-a649-6c97a4354916.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_3-9d813e22-5d77-4862-a728-76cd12ebd648.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_5-a769c3d8-05c6-4ca3-8361-1d246719c85d.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_6-942bac5d-b1e1-4fae-a4d2-a6a42dd8fff8.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_6jivNNYVaMA-f2d58bb6-c95b-46ca-9d38-36095c965132.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_7-7a17d0bc-95a3-4657-9b7e-a2e3746d0d99.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_9-e22929d6-da21-47f6-8aa1-8b8912235e41.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_10-a9ec3e21-92c2-477f-a18d-9ed39d0956e8.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_11-06659270-eeaa-49ca-beae-9938d72480e7.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_12-bdf77511-7e0b-4492-ac32-475ef89f1a19.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_8-2d2f774e-b457-4d01-a2f2-c2465df22754.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_13-41031a92-fd19-4cee-b2d5-a4323c9b1a79.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_14-e1017ac1-15f5-4188-86d5-3c630ad28f37.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_15-ad6aafb1-922d-46e9-a7d1-a17527331294.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_17-257643fc-cd05-463a-aecc-bf04f3d1d810.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_16-43522e98-4a03-4ef2-b311-f5e487d439ad.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_18-81be38fa-4b39-4d7d-8fd8-3601beb290cc.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_19-40134ace-6c95-415f-bcce-101c6292aa23.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_22-9ba0cf61-5aa1-468e-a1a2-076abcf13490.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_20-c121f073-b6ff-4f49-b1ad-9da106fb01de.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_23-2b2a3e57-24dc-4d37-b7f9-58e02835db08.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_21-7c17a447-1551-43f9-a497-43783e6dbe81.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_26-ac27912f-1d15-4d7d-a6ae-9e317473887e.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_25-a33282c6-6333-4632-8df8-09f64c31a175.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_27-c1daafd8-215b-4c65-8d6b-d3a17416b49b.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_29-d5f3003f-0a54-4cd0-ad41-e02d518e14c5.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_30-36ab9129-52a6-479c-b56c-7b067d31dfe6.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_31-ccc3d80c-7041-4e42-93a0-3d6d4c7fbc9b.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_32-18967563-9e78-4edd-b498-59da66a1df7f.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_33-00fcc90a-6e6f-4c54-8e77-9b2b2e2fae19.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_34-e2f42a7b-478f-4bf1-ab54-72433da2766b.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_35-4863b0d3-768d-4198-9712-591dd6111217.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_24-6995b368-77a2-422c-a7a1-93b50e65dd12.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_6765-4cdfdfe3-0180-4b5a-a4c4-539b9e209e77.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_37-04626f6b-6527-4d0f-96e1-2125d8dcc73a.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_38-4ff0a9c0-907f-4968-80f6-e02ad943ea3f.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_39-0174be50-d213-469a-9158-a27942dfc89d.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_42-6811ae06-25f2-4873-ad69-739f3eedde0b.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_40-2fd7b248-a9fe-4fc7-8fda-bacbdb34624b.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_43-dc36f798-390c-4a2b-ba37-255e4a0458b4.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_44-8ec32d0b-079a-4b77-a4ab-0624920db885.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_46-ebbde8ed-4e9b-46fd-8897-0cc78fda3c58.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_45-ec8da4b6-9df7-4d39-802e-a63b4ffdac4f.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_47-86034f9b-816d-47b8-9ce7-1f07a34c050c.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_48-83eb7d97-220e-41cc-956e-ff690bcc9b43.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_49-99bc2cb9-b6aa-4028-8bb8-5563db9c485d.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_50-311adad8-fee8-4ef3-b494-07befb1906fd.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_51-e8c38b4c-d167-468c-9242-a78842431367.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_65-7d7b92b8-2a08-4840-a2d7-676cea325202.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_232-7d90b847-0073-4123-8989-83ea13270bbd.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_433-2e5164b9-e211-488d-9ff3-b4d1576da1da.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_444-56dcd84a-b638-4382-950e-9f1f302e05dd.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_555-015cd625-0273-43f7-a78b-b4031cbff7e2.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_553-5406f2ca-3a62-4939-b7da-83ebd3b6e9b8.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_557-9d3946d1-399e-471c-b467-a069f063853d.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_565-c00f62d8-fd32-4b0e-aded-6d0bedc28317.png",
  "c__Users_Kubal_AppData_Roaming_Cursor_User_workspaceStorage_3ad2d4f6bf091e64e9af64c9545580cf_images_3232-0c193fda-1243-420b-aa7d-44085a3cb338.png"
)

New-Item -ItemType Directory -Force -Path "$base\people", "$base\cofounders", "$base\gallery" | Out-Null

Copy-Item "$assets\$($ordered[0])" "$base\hero-bg.png" -Force
Copy-Item "$assets\$($ordered[1])" "$base\people\tarbokov.png" -Force
Copy-Item "$assets\$($ordered[2])" "$base\people\betuaganov.png" -Force
for ($i = 0; $i -lt 4; $i++) {
  Copy-Item "$assets\$($ordered[3 + $i])" "$base\cofounders\doc-$($i + 1).png" -Force
}
$galleryIdx = 0
for ($i = 7; $i -lt $ordered.Count; $i++) {
  $galleryIdx++
  Copy-Item "$assets\$($ordered[$i])" "$base\gallery\$('{0:D3}' -f $galleryIdx).png" -Force
}
Write-Host "Copied hero, 2 people, 4 cofounders, $galleryIdx gallery images"
