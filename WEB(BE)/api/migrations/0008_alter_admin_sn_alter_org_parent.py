# Generated by Django 4.1.2 on 2022-10-27 13:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_org_parent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='admin',
            name='sn',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.mous', verbose_name='군번'),
        ),
        migrations.AlterField(
            model_name='org',
            name='parent',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='parent_unit', to='api.org', verbose_name='상위부대'),
        ),
    ]